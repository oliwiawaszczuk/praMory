import React from 'react';
import { Text as DefaultText, StyleSheet, TextProps } from 'react-native';

export function Text(props: TextProps) {
    return <DefaultText style={[styles.defaultText, props.style]}>{props.children}</DefaultText>;
}

const styles = StyleSheet.create({
    defaultText: {
        color: '#fff',
        fontFamily: "LeagueSpartan-Regular",
        fontSize: 16,
    },
});
