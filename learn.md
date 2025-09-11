check this website for more leaning in components - https://reactnative.dev/docs/text#numberoflines

https://www.youtube.com/watch?v=J2j1yk-34OY - Set Up React Native
https://docs.expo.dev/router/installation/

npx create-expo-app projectName - create new project .
npm run reset-project - this reset the project
Reminder = if you want to use components make sure that you import that.

<Stack screenOptions={{ headerShown: false }} /> - this remove the index header.

View - is like a dev in html

SafeAreaView - is preventing the text hide to the notch in ios device but you must remove the view to make this pros work.

<TouchableHighlight>, <TouchableWithoutFeedback>, <TouchableOpacity>- to activate touchableHighlight is only work with onPress

<Image source={required ('./asset/icon.png')} /> -this is load the image from you local.

onPress={() => alert('this button is click)} - onPress is like addEventListener (click) in Javascript.

Customize Alert :
Alert.alert('title', 'message', [
{text : 'yes', onPress : () => console.log('yes')},
{text : 'no', onPress : () => console.log('No')} - i use onPress to know what button is click.
]).
<Button
title="Click Me"
onPress={() =>
Alert.alert('My Title', 'My Message', [
{text: 'Yes', onPress : () => console.log('Yes')},
{text: 'No', onPress: () => console.log('no')}
])
} ></Button>

<button onPress{() => console.log('click)}> - this is how buttons work

paddingTop : Platform.OS === 'android' ? StatusBar.currentHeight : 0, - this code use Platform Api so that we can custom the padding ios or android then i also use StatusBar..currentHeight so it can be depends on the android device.

<Image
'put here the pros you want to add fadeDuration:{300}'
source={
width: 200,
height: 200,
{uri: 'paste here the url ' }} /> - Reminder : you must add height and width to display unlike local image it automatic it display base on the original dimension.

<Text numberOfLines={value} > - this numberOfLines make your paragraph one line or depends on what value yuo put.

layout:
orientation : 'default' - this make your orientation depends on the device orientation

const {width , height } = Dimensions.get('window') - this declaration is use to depends on the dimension on the device screen and you can use that in any style.

useDeviceOrientation - this useful to adopt any device orientation.
const landscape = useDeviceOrientation();
return (
<SafeAreaView style={styles.container}>
<View style={{
backgroundColor:"blue",
width : '100%',
height: landscape ? "100%" : "30%"

flexbox -
flex : 1 - entire screen on the device and 0.5 is the haft the screen
flex-start → items stick to the left.
flex-end → items stick to the right.
center → items stay in the middle.
space-between → items spread out, edges filled.
space-around → equal space around each item.
space-evenly → equal space everywhere.

alignContent - is like align items but this only work if there is flexWrap.

flexDirection - maintain the space between the child then if there another child it display in in the next page.

flexBasis: 100, - if there is no with it full the width on the child (vice_versa).

useState () → holds the value
onChangeText {} - Trigger when use is input.

// KeyboardAvoidingView: - moves content up when keyboard appears
// ScrollView: - allows scrolling if keyboard covers inputs
// keyboardShouldPersistTaps="handled": - lets you tap outside inputs to dismiss keyboard
// behavior: - uses "padding" for iOS and "height" for Android to handle keyboard properly
// showsVerticalScrollIndicator={false} - hide the scrollbar in scrollView

keyboardType="email-address" - this automatic your keyboard set to email

email validator - but you
if (!validateEmailWithLibrary(email)) {
alert('invalid Email');
return;
}

<KeyboardAvoidingView
style={{ flex: 1, padding: 20 }}
behavior={Platform.OS === "ios" ? "padding" : "height"} // move content up for keyboard >
<ScrollView keyboardShouldPersistTaps="handled">
