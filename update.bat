@echo off
set pfad=%~dp0
set target=build
set toCopy=%pfad%%target%


git pull
call build.bat


xcopy %toCopy% C:\xampp\htdocs /y



echo "________________________"
echo "________________________"
echo "Erfolgreich aktualisiert"
echo "________________________"
echo "________________________"
timeout /T 10 /nobreak 