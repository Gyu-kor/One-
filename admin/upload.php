<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// 업로드 디렉토리 설정
$uploadDir = '../images/slider/';
$response = array();

// 디렉토리가 없으면 생성
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image'];
        
        // 파일 정보
        $fileName = $file['name'];
        $fileSize = $file['size'];
        $fileTmp = $file['tmp_name'];
        $fileType = $file['type'];
        
        // 파일 확장자 검증
        $allowedTypes = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp');
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $allowedExts = array('jpg', 'jpeg', 'png', 'gif', 'webp');
        
        if (!in_array($fileType, $allowedTypes) || !in_array($fileExt, $allowedExts)) {
            $response['success'] = false;
            $response['message'] = '허용되지 않는 파일 형식입니다. (JPG, PNG, GIF, WebP만 허용)';
            echo json_encode($response);
            exit;
        }
        
        // 파일 크기 검증 (5MB 제한)
        if ($fileSize > 5 * 1024 * 1024) {
            $response['success'] = false;
            $response['message'] = '파일 크기가 너무 큽니다. (최대 5MB)';
            echo json_encode($response);
            exit;
        }
        
        // 새 파일명 생성 (중복 방지)
        $newFileName = 'slide-' . time() . '-' . uniqid() . '.' . $fileExt;
        $uploadPath = $uploadDir . $newFileName;
        
        // 파일 이동
        if (move_uploaded_file($fileTmp, $uploadPath)) {
            $response['success'] = true;
            $response['message'] = '파일이 성공적으로 업로드되었습니다.';
            $response['filename'] = $newFileName;
            $response['path'] = 'images/slider/' . $newFileName;
        } else {
            $response['success'] = false;
            $response['message'] = '파일 업로드에 실패했습니다.';
        }
    } else {
        $response['success'] = false;
        $response['message'] = '파일이 선택되지 않았거나 업로드 오류가 발생했습니다.';
    }
} else {
    $response['success'] = false;
    $response['message'] = '잘못된 요청 방식입니다.';
}

echo json_encode($response);
?> 