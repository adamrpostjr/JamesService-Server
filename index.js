const io = require('socket.io')(6969, {
    cors:{
        origin:'*'
    }
});

const robot = require("robotjs");

const wallpaper = require('wallpaper');
const fs = require('fs')
const request = require('request')


const WindowsToaster = require('node-notifier').WindowsToaster;

var notifier = new WindowsToaster({
    withFallback: false, // Fallback to Growl or Balloons?
    customPath: undefined // Relative/Absolute path if you want to use your fork of SnoreToast.exe
});



console.log('Awaiting Listening:', 6969)

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
    request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
}


io.on('connection', client => { 
    console.log(client.id);
    // pretty much done
    client.on('message', msg => {
        if (msg.titleText !== null && msg.bodyText) {
            notifier.notify( {
                title: msg.titleText,
                message: msg.bodyText, 
                icon: '/Temp/JamesHead.png',
                sound: false,
                id: undefined,
                appID: 'James Haywood',
                remove: undefined,
                install: undefined
              })
        }
    })
    // pretty much done
    client.on('tsws', words =>{
        setTimeout(function () {
            if (words !== null) {
                robot.typeString(words);
            }
        }, 1000);
    })
    
    client.on('mm', cords =>{
        var x = cords.x
        var y = cords.y
        if (x !== null && y !== null) {
            robot.setMouseDelay(2)
            robot.moveMouse(x, y)
        }
    })

    client.on('wallpaper', url =>{
        // console.log('tst')
        console.log(url)
        download(url, '/Temp/test.png', () => {
            console.log('✅ Done!')
          })


    })


});









