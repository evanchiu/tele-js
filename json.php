<?php
// json.php
// Reads the show data and parses it, then provides it as json

// Set timezone
date_default_timezone_set('America/New_York');

// Use curl to get listings from tele
$shows = array();
$json = array();

try {
    $ch = curl_init("http://10.0.0.11:1077");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $data = curl_exec($ch);
    $lines = explode("\n", $data);
    $show = array();
    $prevTitle = '';

    foreach ($lines as $line) {
        // Parse relevant details from line
        preg_match('/\"\>\<code\>([0-9\.]+)(B|K|M|G|T)\<\/code\>.*\>(.*)_.*_(\d+)_(\d+)_(\d+)_(\d+)_(\d+)_(\d+).*?wtv/', $line, $matches);
        if ($matches) {
            // Parse details
            $size = bytes($matches[1], $matches[2]);
            $title = $matches[3];
            $date = new DateTime(
                $matches[4] . '-' .
                $matches[5] . '-' .
                $matches[6] . ' ' .
                $matches[7] . ':' .
                $matches[8] . ':' .
                $matches[9]);

            // Check if it's a new show
            if ($title != $prevTitle) {
                if ($prevTitle != '') {
                    $shows[] = $show;
                }
                $show = array('title' => $title,
                    'episodes' => array());
                $prevTitle = $title;
            }

            // Add this episode
            $show['episodes'][] = array(
                'date' => $date->format('D, M j, Y'),
                'timestamp' => $date->getTimeStamp(),
                'size' => $size
            );
        }
    }

    // Add in last show
    if ($prevTitle != '') {
        $shows[] = $show;
    }
} catch (Exception $e) {
    $json['error'] = $e->getMessage();
}

$json['shows'] = $shows;
print json_encode($json);

function bytes($size, $unit) {
    return $size * 1 << (strpos('BKMGT', $unit) * 10);
}
