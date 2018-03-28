<?php

ini_set('dispaly_errors', 1);
ini_set('error_reporting', E_ALL);
define('UPLOAD_DIR', 'res/image/upload');
$response = ['body' => ['message' => 'Not Found', 'data' => NULL], 'status_code' => 404];

// Handle request by it's method.
switch ($_SERVER['REQUEST_METHOD']) {

	// Save the image.
	case 'POST':

		// Collect the JSON part.
		$req = json_decode(file_get_contents('php://input'), true);

		// The request has the 'base64' field.
		if (isset($req['base64'])) {

			// Check if this field is empty.
			$base64 = trim($req['base64']);
			if (!strlen($base64)) {

				$response['body']['message'] = 'base64 is required.';
				$response['status_code'] = 422;
				break;
			}

			// Format the Base64 data.
			$base64 = str_replace('data:image/png;base64,', '', $base64);
			$base64 = str_replace(' ', '+', $base64);
			$img = base64_decode($base64);

			if (!$img) {
				$response['body']['message'] = 'base64 is invalid.';
				$response['status_code'] = 422;
				break;
			}

			// Store this in a PNG file with a unique file name.
			$filename = uniqid() . '.png';
			$path = UPLOAD_DIR . '/' . $filename;

			// Prepare the respone.
			$response['body']['data']['filename'] = $filename;
			$response['body']['data']['path'] = $path;

			if (!file_put_contents($path, $img)) {
				$response['body']['message'] = 'Can not write the file.';
				$response['status_code'] = 500;
				break;
			}

			$response['body']['message'] = 'OK';
			$response['status_code'] = 200;
		}
		break;

	// Get the list of uploaded images.s
	case 'GET':

		$images = [];

		foreach (new \DirectoryIterator(UPLOAD_DIR) as $fileInfo) {
			if ($fileInfo->isDot()) {
				continue;
			}

			$filename = $fileInfo->getFilename();
			$path = UPLOAD_DIR . '/' . $filename;

			if (is_readable($path)) {
				$images[] = ['filename' => $filename, 'path' => $path];
			}
		}

		$response['body']['data'] = $images;
		$response['body']['message'] = 'OK';
		$response['status_code'] = 200;

		break;
}

// Return response as JSON with body and status code.
header('Content-Type: application/json');
http_response_code($response['status_code']);
echo json_encode($response['body']);
exit();
