<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$configFile = '../slider-config.json';
$response = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON 데이터 받기
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if ($data === null) {
        $response['success'] = false;
        $response['message'] = '잘못된 JSON 데이터입니다.';
        echo json_encode($response);
        exit;
    }
    
    // 데이터 검증
    if (!isset($data['slides']) || !is_array($data['slides'])) {
        $response['success'] = false;
        $response['message'] = '슬라이드 데이터가 올바르지 않습니다.';
        echo json_encode($response);
        exit;
    }
    
    // 각 슬라이드 데이터 검증
    foreach ($data['slides'] as $slide) {
        if (!isset($slide['id']) || !isset($slide['title']) || !isset($slide['subtitle'])) {
            $response['success'] = false;
            $response['message'] = '슬라이드 데이터가 불완전합니다.';
            echo json_encode($response);
            exit;
        }
    }
    
    // JSON 파일로 저장
    $jsonData = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    
    if (file_put_contents($configFile, $jsonData) !== false) {
        $response['success'] = true;
        $response['message'] = '설정이 성공적으로 저장되었습니다.';
    } else {
        $response['success'] = false;
        $response['message'] = '설정 저장에 실패했습니다.';
    }
} else {
    $response['success'] = false;
    $response['message'] = '잘못된 요청 방식입니다.';
}

echo json_encode($response);
?> 