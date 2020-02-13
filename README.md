# Note taking app in Ionic
## Overview
This is a demo app for taking notes with the following features:

- create a note with the option of attaching a photo
- view the details of a note and edit the text
- delete a note in detail view
- search for a note title in the list view

This demo is functional, however it currently has a few issues, see the [issues page](https://github.com/johannesmu/notes-demo/issues). These issues may be resolved over time, so check back for updates.

## Installation
### Requirements
#### Git
You will need to have git installed on your computer, either the command line version or the GUI version, such as the Github Desktop or SourceTree.

#### Nodejs
If you don't have nodejs installed on your computer, you will need to download and install it from the [website](https://nodejs.org). It is recommended to use the LTS version for the most stability.

#### Ionic and Cordova
You will need to have the Ionic CLI and Cordova installed on your computer, as global modules

##### Mac OS
```
sudo npm install -g ionic cordova native-run
```
##### Windows
```
npm install -g ionic cordova native-run
```
#### Android Studio and Android SDK
If you're planning to build for Android, you will need to install [Android Studio](https://developer.android.com/studio). You may also need to update the SDK (using the SDK manager) to the version suitable for your target platform, as well as, create a [Virtual Device](https://developer.android.com/studio/run/emulator) (using the AVD manager) to emulate your target platform.

#### Xcode
If you're planning to build for IOS, you will need to install [Xcode and the IOS SDK](https://developer.apple.com/xcode/). To deploy to an IOS device, you will also need to have an Apple Developer account.

You will also need to install the **IOS command line tools**. Follow the instructions [here](https://www.ics.uci.edu/~pattis/common/handouts/macmingweclipse/allexperimental/macxcodecommandlinetools.html)

**Note**
Xcode will only run on MacOS, so effectively, you cannot build for IOS using Windows.

#### JDK
To build the app, you will also need to have JDK installed. Since Cordova prefers Java 8, I recommend installing [version 8 of the JDK](https://www.oracle.com/java/technologies/javase-jdk8-downloads.html). Since JDK 8 is not the current version, you may need to register for a free Oracle account to download it.

#### Gradle
To build for Android, you will also need to have [Gradle](https://gradle.org/install/) installed in your system. Make sure that Gradle is available in your system path, so that it is available as a command throughout your system. Test your system with
```
gradle -v
```
If you get a version number, then you have set it up correctly. If not, search online for how to add a folder to your system path.

### Cloning the repository
To create this project on your computer, you will need to clone this repository into an empty directory. Open the terminal in your empty directory and run:
```
git clone https://github.com/johannesmu/notes-demo.git .
```
### Installing the dependencies
Before running the project, you will need to install the dependencies. Open the terminal in your project directory and run:
```
npm install
```
### Adding platforms
Since this project is cross platform, it needs to have platforms and their dependencies added to enable building for the different platforms. Install the platforms from inside your project directory using:
#### IOS
```
ionic cordova platform add ios
```
#### Android
```
ionic cordova platform add Android
```
### Building the project
You should build the project first before deploying to an emulator, to test if it will build, run the command(s) below in the project directory.
```
ionic cordova build ios
```
or
```
ionic cordova build android
```
Fix all the errors encountered. If needed, you can run the above command(s) with the `--verbose` option added at the end so you can see more messages

### Running in emulator
To run the project in Android emulator or IOS simulator, you can run:
```
ionic cordova run ios
```
or
```
ionic cordova run android
```

### Running on a device
To run the project on a device, you will need
### IOS
- An IOS device connected via USB
- An Apple Developer account (or a team license)

### Android
- An Android device connected via USB, with Developer options and USB debugging enabled.
- The computer needs to be authorised and allowed to debug the device.

Run the commands in the above section to install and launch the app on the device
