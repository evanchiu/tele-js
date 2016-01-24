<?php
// config.php
// System configuration

// Set timezone
date_default_timezone_set('America/Los_Angeles');

// Server side configuration
$server_config = array(
    // Page title
    'title' => 'Tele',
    // Page tagline
    'tagline' => 'These television recordings are available',

    // The IP of the tele vm, providing the show listings
    'tele-ip' => '10.0.0.11',
    // The port of the service giving the show listing
    'tele-port' => '1077'
);

// Client side configuration
$client_config = array(
    // Total bytes available
    'total-bytes' => 1000000000000,
    // Bytes used by Operating System (Windows)
    'os-bytes' => 30000000000,

    // Color choices are:
    // blue, green, pink, red, and violet

    // Set default color for shows not in the list below
    'default-show-color' => 'pink',
    // Define colors for each show in your list
    'show-colors' => array(
        'Blood & Oil'                         => 'violet',
        'Brooklyn Nine-Nine'                  => 'blue',
        'Chicago Fire'                        => 'violet',
        'Chicago Med'                         => 'violet',
        'Chicago P.D.'                        => 'violet',
        'Chicago'                             => 'violet',
        'Fresh Off the Boat'                  => 'blue',
        'Galavant'                            => 'blue',
        'Grandfathered'                       => 'blue',
        'Grey&#x27;s Anatomy'                 => 'violet',
        'How to Get Away With Murder'         => 'violet',
        'Limitless'                           => 'blue',
        'Madam Secretary'                     => 'violet',
        'Marvel&#x27;s Agents of S.H.I.E.L.D.'=> 'blue',
        'Marvel&#x27;s Agent Carter'          => 'blue',
        'Minority Report'                     => 'blue',
        'New Girl'                            => 'blue',
        'Once Upon a Time'                    => 'blue',
        'Quantico'                            => 'violet',
        'Scandal'                             => 'violet',
        'Scorpion'                            => 'blue',
        'Supergirl'                           => 'blue',
        'The Blacklist'                       => 'violet',
        'The Good Wife'                       => 'violet',
        'The Grinder'                         => 'blue'
    )
);
