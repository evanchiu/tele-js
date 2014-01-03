<?php
// json.php
// Reads the show data and parses it, then provides it as json

// Set timezone
date_default_timezone_set('America/New_York');

// Use curl to get listings from tele
$ch = curl_init("http://10.0.0.11:1077");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$data = curl_exec($ch);

$links = getLinks($data);
$shows = array();
foreach ($links as $link) {
    if (endsWith($link, 'wtv')) {
        // parse out show title and date
        preg_match('/\/(.*)_(\w+)_(\d+)_(\d+)_(\d+)_(\d+)_(\d+)_(\d+).wtv/', $link, $matches);
        $date = new DateTime($matches[3] . '-' . $matches[4] . '-' . $matches[5]
            . ' ' . $matches[6] . ':' . $matches[7] . ':' . $matches[8]);
        $title = $matches[1];
        if (!array_key_exists($title, $shows)) {
            // Add show to array
            $shows[$title] = array(array(
                'date' => $date->format('l, M j'),
                'timestamp' => $date->getTimeStamp()
            ));
        } else {
            // Add this date instance
            $shows[$title][] = array(
                'date' => $date->format('l, M j'),
                'timestamp' => $date->getTimeStamp()
            );
        }
    }
}
print json_encode(array('shows' => $shows));

# Source from Stack Overflow:
# http://stackoverflow.com/questions/834303/php-startswith-and-endswith-functions
function endsWith($haystack, $needle)
{
    return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
}

# Source from Stack Overflow:
# http://stackoverflow.com/questions/1519696/preg-match-all-a-href/1519780#1519780
function getLinks($html) {
    $doc = new DOMDocument();
    $doc->loadHTML($html);
    $xpath = new DOMXPath($doc);
    $nodeList = $xpath->query('//a/@href');
    $links = array();
    for ($i = 0; $i < $nodeList->length; $i++) {
        # Xpath query for attributes gives a NodeList containing DOMAttr objects.
        # http://php.net/manual/en/class.domattr.php
        $links[] = $nodeList->item($i)->value;
    }
    return $links;
}
