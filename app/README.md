# Dev Env Setup
## Development on Mac
[Markdown Syntax](https://guides.github.com/features/mastering-markdown/)
> Follow these steps to install awsmobile and node.js
Install the AWS Mobile CLI
npm install --global awsmobile-cli

> Configure the CLI with your AWS credentials
To setup permissions for the toolchain used by the CLI, run:
awsmobile configure
If prompted for credentials, follow the steps provided by the CLI.
For more information, see Provide IAM credentials to AWS Mobile CLI.

> Download Atom + Nuclide for easy react + node development
IDE provided by Facebook

## Run and test using simulator
You need to install xcode and android studio for iOS and android
simulators respectively. Just install them from app store and official site.

```
npm run ios
```
or
```
npm run android
```

## Android build failures
### failure like "no sdk.dir found"
create or copy a local.properties in android folder
with
```
sdk.dir=/Users/<usr>/Library/Android/sdk
```
### haven't accepted licenses

```
/Users/<usr>/Library/Android/sdk/tools/bin/sdkmanager --licenses
```

### no simulator
Create a simulator and run it before "npm run android"
https://developer.android.com/studio/build/building-cmdline.html#RunningOnEmulator
(Android Studio -> Tools -> AVD Manager) follow steps to create one.

Run emulator from command line
```
/Users/<usr>/Library/Android/sdk/emulator/emulator
<e.g>
/Users/<usr>/Library/Android/sdk/emulator/emulator -avd <Nexus_6P_API_27>
```

Make sure tool adb is in your path since it's used to launch the command
/Users/<usr>/Library/Android/sdk/platform-tools/adb


## Example for reference
Sample for ref https://github.com/aws-samples/aws-mobile-react-sample
