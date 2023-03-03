import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Formik } from "formik";

export default function RegistrationScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Реєстрація</Text>
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
        >
            {(props) => (
            <View>
                <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                />
                <Button title="Submit" color="maroon" onPress={props.handleSubmit} />
            </View>
            )}
        </Formik>
        </View>
    );
}
    