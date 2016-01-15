set NODE_ENV=production
mkdir lib
cpx ".\src\**\*.scss" .\lib && babel src --out-dir lib
