# Tele
A simple web app for displaying recorded television shows.

## Sample Screenshot
![Tele Screenshot](sample.png)

## Web app setup
* Clone repository
* Modify [ServerConfig.js](ServerConfig.js) and [ClientConfig.js](src/ClientConfig.js) for your setup
* Make sure the directory in [tele-server.service](tele-server.service) on the `WorkingDirectory` line matches the directory where these files are checked out.
* Run these commands to complete the installation and run the service


    sudo cp tele-server.service /lib/systemd/system/
    npm install
    npm run build
    sudo systemctl start tele-server

## My Setup
Tele is also is my name for a Windows VM set up to:
* Record DVR Content
* Provide that content to the XBox as a Media Center Extender

I've run into a lot of trouble setting it up because I like to run it as a headless VM on my linux server.  This allows me to give it tons of hard drive space for saving those recordings, and saves me from running another server box.  The problem is that Windows Media Center has DRM protection issues and wants to make sure your PC is powerful enough to play that TV without issue.

### Host Setup
* I'm running Elementary OS 0.4: Loki x64
* Install graphics drivers - I have an AMD Trinity APU (CPU/GPU)
* Install Oracle VirtualBox
* Ideally, I’d start the VM on startup of the host, but I haven't had success launching it on startup or headlessly.

### Windows Setup
* Create a Windows 7 x64 VM
  * My host has 8gb RAM, so I'm comfortable giving the VM 4gb
  * Give it 256mb of video memory, and enable 2d and 3d acceleration
  * Set the network to bridged
* Get it fully updated (currently about 5-10 reboots and more updates)
* Install [Virtual Box Guest Additions](https://docs.oracle.com/cd/E36500_01/E36502/html/qs-guest-additions.html)
  * Take the advanced WMMD drivers
* Download [HDHomeRun Software](http://my.hdhomerun.com/instructions/)
  * Install it and run it to find the tuners on your network and configure Windows to recognize them
  * Make sure Windows is treating this as a Home network
* Follow [Windows Media Center Instructions](http://my.hdhomerun.com/instructions/software-instructions/wmc.php)
* If Digital Cable Advisor fails, you may need to [override](http://www.missingremote.com/guide/override-digital-cable-advisor-windows-media-center-7) it
* Install Cygwin so that the PC can be remotely administered over command line
  * Net / OpenSSH Server
* Install [node.js](https://nodejs.org/en/)
  * Install [http-server](https://www.npmjs.com/package/http-server)
    * `npm install -g http-server`
  * Make an empty directory named `empty` in your home directory for monitoring without exposing your files
  * Go to Task Scheduler and set up two tasks
    * Show Listings
      * Run program whether user is logged on or not
      * Trigger: At startup
      * Run a program: `http-server`
      * Arguments: `"C:\Users\Public\Recorded TV" -p 1077`
      * Uncheck configuration to kill it after 3 days
    * Monitor Listing
      * Run program whether user is logged on or not
      * Trigger: At startup
      * Run a program: `http-server`
      * Arguments: `"C:\Users\Users\evan\empty" -p 10077`
      * Uncheck configuration to kill it after 3 days
* Configure Windows Firewall
  * Search start menu for "Allow a program through Windows Firewall"
    * Change Settings
    * Allow another program...
    * Node.js

### Monitoring Setup
* I set up monitoring, so I know when this thing goes down
* In your router
  * Give the tele vm a static IP
  * Set up port forwarding for the port serving an empty directory
* In [UptimeRobot](https://uptimerobot.com/)
  * Monitor that port

&copy; 2016 Evan Chiu. Licensed under the [MIT License](LICENSE)
