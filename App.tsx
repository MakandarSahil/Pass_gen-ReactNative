import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from "react-native-bouncy-checkbox";

import * as Yup from 'yup'
import { Formik } from 'formik'

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .typeError('Password length must be a number')
    .min(4, 'Length should be minimum of 4')
    .max(16, 'Length should not exceed 16')
    .required('Length is required'),
});


const App = () => {

  let [password, setPassword] = useState('')
  let [isPassGenrated, setIsPassGentated] = useState(false)

  let [upperCase, setupperCase] = useState(false)
  let [lowerCase, setlowerCase] = useState(false)
  let [numbers, setNumbers] = useState(false)
  let [symbols, setSymbols] = useState(false)

  const genratePasswordString = (passwordLength: number) => {

    let characterList = ''
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) {
      characterList += upperCaseChars
    }
    if (lowerCase) {
      characterList += lowerCaseChars
    }
    if (numbers) {
      characterList += digitChars
    }
    if (symbols) {
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList, passwordLength)

    setPassword(passwordResult)
    setIsPassGentated(true)

  }

  const createPassword = (characters: string, passwordLength: number) => {
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(charIndex)
    }
    return result
    console.log("Sahil")
  }

  const resetPassword = () => {
    setPassword('')
    setIsPassGentated(false)
    setupperCase(false)
    setlowerCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>
            Password Generator
          </Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values)
              genratePasswordString(Number(values.passwordLength))
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
              /* and other goodies */
            }) => (
              <>
                {/* password length input feild */}
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder='Ex. 6'
                    keyboardType='numeric'
                  />
                </View>
                {/* loweCase check */}
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include Lowercase
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setlowerCase(!lowerCase)}
                    fillColor='#29AB87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include Uppercase
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setupperCase(!upperCase)}
                    fillColor='#FED85D'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include Numbers
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor='#C9A0DC'
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>
                    Include Symbols
                  </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor='#FC80A5'
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.primaryBtnTxt}>Genrate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword()
                    }}
                  >
                    <Text style={styles.primaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>

                </View>
              </>
            )}
          </Formik>

          {isPassGenrated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description}>Long Press to copy</Text>
              <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
            </View>
          ) : null}
        </View>

      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({

  // main:{
  //   backgroundColor: "#212121"
  // },

  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
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
    color: '#000'
  },

})