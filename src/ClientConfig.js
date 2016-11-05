// Client side configuration
const ClientConfig = {
  // Page title
  title: 'Tele',
  // Page tagline
  tagline: 'These television recordings are available',

  // Total bytes available
  totalBytes: 500000000000,
  // Bytes used by Operating System (Windows)
  // 0 if the recordings are not on the OS drive
  osBytes: 0,

  // Color choices are:
  // blue, green, pink, red, and violet

  // Set default color for shows not in the list below
  defaultShowColor: 'pink',
  // Define colors for each show in your list
  showColors: {
    'BattleBots'                          : 'blue',
    'Blood & Oil'                         : 'violet',
    'Brooklyn Nine-Nine'                  : 'blue',
    'Bull'                                : 'violet',
    'Chicago Fire'                        : 'violet',
    'Chicago Med'                         : 'violet',
    'Chicago P.D.'                        : 'pink',
    'Chicago'                             : 'violet',
    'Fresh Off the Boat'                  : 'blue',
    'Galavant'                            : 'blue',
    'Grandfathered'                       : 'blue',
    'Grease- Live'                        : 'blue',
    'Grey\'s Anatomy'                     : 'violet',
    'How to Get Away With Murder'         : 'violet',
    'Jane the Virgin'                     : 'violet',
    'Limitless'                           : 'blue',
    'MacGyver'                            : 'blue',
    'Madam Secretary'                     : 'violet',
    'Marvel\'s Agents of S.H.I.E.L.D.'    : 'blue',
    'Marvel\'s Agent Carter'              : 'blue',
    'New Girl'                            : 'blue',
    'Notorious'                           : 'violet',
    'Once Upon a Time'                    : 'blue',
    'Olympics 2016 Primetime'             : 'blue',
    'Quantico'                            : 'blue',
    'Scandal'                             : 'violet',
    'Scorpion'                            : 'blue',
    'The Good Wife'                       : 'violet',
    'The Grinder'                         : 'blue',
    'This is us'                          : 'violet',
    'Timeless'                            : 'blue'
  }
};

export default ClientConfig;
