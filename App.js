/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node}
from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import {Header as HeaderRNE, HeaderProps, Icon, Button} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Slider } from "@rneui/themed";


const data = [
    {
        label: 'RED',
        value: '1'
    },
    {
        label: 'GREEN',
        value: '2'
    },
    {
        label: 'BLUE',
        value: '3'
    },
    {
        label: 'YELLOW',
        value: '4'
    }, {
        label: 'WHITE',
        value: '5'
    },
];




const App: () => Node = () => {
    const [value1, setValue_1] = useState(null);
    const [value2, setValue_2] = useState(null);
    const [value3, setValue_3] = useState(null);
    const [value4, setValue_4] = useState(null);
    const [value5, setValue_5] = useState(null);
    
    const [isFocus1, setIsFocus1] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [isFocus3, setIsFocus3] = useState(false);
    const [isFocus4, setIsFocus4] = useState(false);
    const [isFocus5, setIsFocus5] = useState(false);

    const [sliderValue,setSliderValue] = useState(0);
    const [iterValue,setIterValue] = useState(2);
    const [duration,setDuration] = useState(1);
   

    const renderLabel1 = () => {
        if (value1 || isFocus1) {
            return (
                <Text style={[styles.label, isFocus1 && { color: 'blue' }]}>
                 Color1
                </Text>               
            );
        }
        return null;
    };
    const renderLabel2 = () => {
        if (value2 || isFocus2) {
            return (
                <Text style={[styles.label, isFocus2 && { color: 'blue' }]}>
                 Color2
                </Text>               
            );
        }
        return null;
    };
    const renderLabel3 = () => {
        if (value3 || isFocus3) {
            return (
                <Text style={[styles.label, isFocus3 && { color: 'blue' }]}>
                 Color3
                </Text>               
            );
        }
        return null;
    };
    const renderLabel4 = () => {
        if (value4 || isFocus4) {
            return (
                <Text style={[styles.label, isFocus4 && { color: 'blue' }]}>
                 Color4
                </Text>               
            );
        }
        return null;
    };
    const renderLabel5 = () => {
        if (value5 || isFocus5) {
            return (
                <Text style={[styles.label, isFocus5 && { color: 'blue' }]}>
                 Color5
                </Text>               
            );
        }
        return null;
    };

    const isDarkMode = useColorScheme() === 'dark';
   
    
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.white

    };

    const updateThingSpeak = async () => {

        
        var str = "";
        if(value1){
            str+=value1;
        }
        if(value2){
            str+=value2;
        }
        if(value3){
            str+=value3;
        }
        if(value4){
            str+=value4;
        }
        if(value5){
            str+=value5;
        }
        if(str == ""){
            str = "12345";
        }
        console.log(str);
        console.log(sliderValue);
        var allfields = JSON.stringify({color: str, intensity: sliderValue, iterations: iterValue, duration: duration});

        const request = new Request('https://api.thingspeak.com/update.json', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {api_key: "U22K59XZQ3MDYUOT", field1: 1, field2: allfields}
            )

        });
        fetch(request).then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on API server!');
            }
        }).then((response) => {
            console.debug(response);
            // …
        }).catch((error) => {
            console.error(error);
        });


    };


    return (
        <SafeAreaProvider style={backgroundStyle}>
            <HeaderRNE 
            backgroundColor='black'
            leftComponent={
                    {color: '#fff'}
                }
                rightComponent={<View
                    style={
styles.headerRight}>
                <TouchableOpacity>

                    </TouchableOpacity>
<TouchableOpacity
style={
{marginLeft: 10}}>


                </TouchableOpacity></View>}
                centerComponent={
                    {
                        text: 'Pupil Detection',
                        style: styles.heading
                    }
                }/> 

    <Text style = {styles.HeaderTextStyle}>Select Color Order</Text>
    
    <View style = {styles.row}>
        <View style={styles.container}>
        {renderLabel1()}

        <Dropdown
          style={[styles.dropdown, isFocus1 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus1 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value1}
          onFocus={() => setIsFocus1(true)}
          onBlur={() => setIsFocus1(false)}
          onChange={item => {
            setValue_1(item.value);
            setIsFocus1(false);
          }}
         
        />
        </View>
        <View style={styles.container}>
        {renderLabel2()}

        <Dropdown
          style={[styles.dropdown, isFocus2 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus2 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value2}
          onFocus={() => setIsFocus2(true)}
          onBlur={() => setIsFocus2(false)}
          onChange={item => {
            setValue_2(item.value);
            setIsFocus2(false);
          }}
          
        />
         </View>
         

        <View style={styles.container}>
        {renderLabel3()}

        <Dropdown
          style={[styles.dropdown, isFocus3 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus3 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value3}
          onFocus={() => setIsFocus3(true)}
          onBlur={() => setIsFocus3(false)}
          onChange={item => {
            setValue_3(item.value);
            setIsFocus3(false);
          }}
         
        />
        </View>       
        <View style={styles.container}>
        {renderLabel4()}
        <Dropdown
          style={[styles.dropdown, isFocus4 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus4 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value4}
          onFocus={() => setIsFocus4(true)}
          onBlur={() => setIsFocus4(false)}
          onChange={item => {
            setValue_4(item.value);
            setIsFocus4(false);
          }}
          
        />
        </View>
        <View style={styles.slidercontainer}>           
        </View>
        </View>

        <View style={styles.lastbot}>
        {renderLabel5()}
        <Dropdown
          style={[styles.droplast, isFocus5 && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus5 ? 'Select Color' : '...'}
          searchPlaceholder="Search..."
          value={value5}
          onFocus={() => setIsFocus5(true)}
          onBlur={() => setIsFocus5(false)}
          onChange={item => {
            setValue_5(item.value);

            setIsFocus5(false);
          }}
       
        />
        </View>         


        
        <Text style = {styles.ChildTextStyle}>Intensity: {sliderValue}</Text>
        <View style={[styles.contentView]}>
      <Slider
        value={sliderValue}
        onValueChange={setSliderValue}
        maximumValue={100}
        minimumValue={0}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
       
      />
       </View>
      <Text style = {styles.ChildTextStyle}>Iterations: {iterValue}</Text>
        <View style={[styles.contentView]}>
      <Slider
        value={iterValue}
        onValueChange={setIterValue}
        maximumValue={10}
        minimumValue={0}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
       
      />
      </View>

      <Text style = {styles.ChildTextStyle}>Duration: {duration} {duration == 1 ? "sec" :"secs"}</Text>
        <View style={[styles.contentView]}>
      <Slider
        value={duration}
        onValueChange={setDuration}
        maximumValue={10}
        minimumValue={1}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
       
      />
      </View>
   
       
            <Button buttonStyle={
                    {
                     width: 150,
                     backgroundColor: 'rgba(39, 39, 39, 1)'
                    }
                }
            
                containerStyle={
                    {
                        margin: 5,
                        marginTop: 20,
                        alignSelf: 'center',
                        padding: 20,
                        
                    }
                }

                disabledStyle={
                    {
                        borderWidth: 2,
                        borderColor: "#00F"
                    }
                }
                disabledTitleStyle={
                    {color: "#00F"}
                }

                onPress={
                    () => updateThingSpeak()
                }
                title="Start"
                titleProps={
                    {}
                }
                titleStyle={
                    {marginHorizontal: 5}
                }/>

        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
  
    HeaderTextStyle:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,

    },
    ChildTextStyle:{
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 5,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      lastbot: {
        backgroundColor: 'white',
        padding: 16,               
      },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#397af8',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5
    },
    dropdown: {
        height: 50,
        width: '100%',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,       
        alignSelf: "flex-start", 
    },
    droplast:{
        height: 50,
        width: '50%',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,       
        alignSelf: "center", 
    },
    icon: {
        marginRight: 5
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        width: '50%'
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14
    },
    subheaderText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    placeholderStyle: {
        fontSize: 16
    },
    selectedTextStyle: {
        fontSize: 16
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    slidercontainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    },
    contentView: {
        
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
      },
    
});

export default App;
