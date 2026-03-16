import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckBox from 'react-native-bouncy-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';

const passwordValidation = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be grater than 4 characters ')
    .max(16, 'Should be less than 16 characters ')
    .required('Password is required'),
});
export default function App() {
  const [password, setPassword] = useState('');

  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);

  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let charKey = '';
    if (lowercase) charKey += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) charKey += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charKey += '0123456789';
    if (symbols) charKey += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const passRes = createPassword(charKey, passwordLength);
    setPassword(passRes);
    setIsPasswordGenerated(true);
  };

  const createPassword = (char: string, passlength: number) => {
    let res = '';
    for (let i = 0; i < passlength; i++) {
      const charIndex = Math.round(Math.random() * char.length);
      res += char.charAt(charIndex);
    }
    return res;
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}> Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordValidation}
            onSubmit={values => {
              console.log(values);

              generatePasswordString(Number(values.passwordLength));
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
             
            }) => (
              <>
              <View style={styles.wrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}> Password Length  </Text>
                  {errors.passwordLength && touched.passwordLength && (
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.passwordLength}</Text>
                  )} 
                </View>
                <TextInput 
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Password Length"
                    keyboardType="numeric"
                  />
              </View>
              <View style={styles.wrapper}><Text style={styles.heading}>Include lowercase</Text>
              <BouncyCheckBox
                useBuiltInState
                isChecked={lowercase}
                onPress={() => setLowercase(!lowercase)}
                fillColor='#29AB87'
              />
              </View>
              <View style={styles.wrapper}><Text style={styles.heading}>Include uppercase</Text>
              <BouncyCheckBox
                useBuiltInState
                isChecked={uppercase}
                onPress={() => setUppercase(!uppercase)}
                fillColor='#29AB87'
              />
              </View>
              <View style={styles.wrapper}><Text style={styles.heading}>Include numbers</Text>
              <BouncyCheckBox
                useBuiltInState
                isChecked={numbers}
                onPress={() => setNumbers(!numbers)}
                fillColor='#29AB87'
              />
              </View>
              <View style={styles.wrapper}><Text style={styles.heading}>Include symbols</Text>
              <BouncyCheckBox
                useBuiltInState
                isChecked={symbols}
                onPress={() => setSymbols(!symbols)}
                fillColor='#29AB87'
              />
                </View>

              <View style={styles.formAction}>
              <TouchableOpacity
              disabled={!isValid}
              style={styles.buttonPrimary}
              onPress={handleSubmit}
              ><Text style={styles.buttonText}> Generate Password </Text></TouchableOpacity>
              <TouchableOpacity
                onPress={() =>{handleReset(),
                  resetPasswordState()
                }}
                style={styles.buttonSecondary}
              >
                <Text style={styles.buttonSecondaryText}> Reset </Text>
              </TouchableOpacity>
              </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated?(
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Generated Password:</Text>
            <Text style={styles.description}>Long Press to copy</Text>
            <Text style={styles.generatedPassword} selectable={true}>
              {password}
            </Text>
          </View>
        ): null}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 20,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
     marginBottom: 20,
     color:'#fff'
  },
  wrapper:{
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  formAction:{flexDirection: 'row',
    justifyContent: 'center',},
  inputColumn:{
    flexDirection: 'column',
  },
  inputStyle:{
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  buttonPrimary:{
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  buttonSecondary:{
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',

  },
  buttonSecondaryText:{
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    marginVertical: 20,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
  description:{
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
    color:'#666'
  },
  heading:{
    fontSize: 15,
    color:'#fff'
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
