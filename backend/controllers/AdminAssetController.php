<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Database\Connection;
use PDO;
use RuntimeException;

final class AdminAssetController
{
    /**
     * List image/affiliate-link pairs submitted or active for removal
     */
    public function listSubmissions(): void
    {
        $pdo = Connection::getInstance();
        $stmt = $pdo->query("
            SELECT s.*, p.title as product_title 
            FROM product_submissions s
            LEFT JOIN deals p ON s.target_product_id = p.id
            WHERE s.status != 'removed'
            ORDER BY s.id DESC
        ");
        $submissions = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'data' => $submissions
        ]);
        exit;
    }

    /**
     * Add Product Image & Affiliate Link (Only 2 inputs allowed)
     */
    public function addAsset(): void
    {
        $affiliateUrl = filter_var($_POST['affiliate_url'] ?? '', FILTER_VALIDATE_URL);
        if (!$affiliateUrl) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'A valid HTTPS affiliate URL is required.']);
            exit;
        }

        $targetProductId = !empty($_POST['target_product_id']) ? (int)$_POST['target_product_id'] : null;

        if (empty($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'A valid product image file is required.']);
            exit;
        }

        $file = $_FILES['image'];
        $allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!in_array($mime, $allowedTypes, true)) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Invalid image format. Allowed: JPG, PNG, WEBP.']);
            exit;
        }

        if ($file['size'] > 5 * 1024 * 1024) {
            http_response_code(422);
            echo json_encode(['success' => false, 'message' => 'Image exceeds maximum 5MB size limit.']);
            exit;
        }

        $uploadDir = __DIR__ . '/../../public/uploads/products/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = 'asset_' . bin2hex(random_bytes(10)) . '.' . $ext;
        $destPath = $uploadDir . $fileName;

        if (!move_uploaded_file($file['tmp_name'], $destPath)) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to save uploaded image.']);
            exit;
        }

        $publicPath = '/uploads/products/' . $fileName;
        $pdo = Connection::getInstance();

        // If attaching to existing deal, update deal_links or image directly if requested
        if ($targetProductId) {
            $stmtUpdate = $pdo->prepare("UPDATE deals SET image_url = ?, affiliate_url = ? WHERE id = ?");
            $stmtUpdate->execute([$publicPath, $affiliateUrl, $targetProductId]);
        }

        // Record submission
        $stmt = $pdo->prepare("
            INSERT INTO product_submissions (image_path, affiliate_url, target_product_id, submitted_by, status)
            VALUES (?, ?, ?, 2, 'pending')
        ");
        $stmt->execute([$publicPath, $affiliateUrl, $targetProductId]);

        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Product image and affiliate link saved successfully!',
            'data' => [
                'id' => $pdo->lastInsertId(),
                'image_path' => $publicPath,
                'affiliate_url' => $affiliateUrl
            ]
        ]);
        exit;
    }

    /**
     * Remove Product Image & Affiliate Link
     */
    public function removeAsset(int $id): void
    {
        $pdo = Connection::getInstance();
        $stmtFind = $pdo->prepare("SELECT * FROM product_submissions WHERE id = ?");
        $stmtFind->execute([$id]);
        $submission = $stmtFind->fetch(PDO::FETCH_ASSOC);

        if (!$submission) {
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'Asset submission not found.']);
            exit;
        }

        // Soft-remove from submissions
        $stmtDel = $pdo->prepare("UPDATE product_submissions SET status = 'removed', removed_at = NOW() WHERE id = ?");
        $stmtDel->execute([$id]);

        // If was attached to deal, set deal inactive or clear link to prevent broken listings
        if (!empty($submission['target_product_id'])) {
            $stmtClear = $pdo->prepare("UPDATE deals SET is_active = 0 WHERE id = ?");
            $stmtClear->execute([$submission['target_product_id']]);
        }

        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'Product image and affiliate link removed successfully.'
        ]);
        exit;
    }
}

