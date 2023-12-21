import { View, Text } from 'react-native'
import React from 'react'
import { Snackbar } from 'react-native-paper';


const CustomToast = ({isVisible, onDismiss, action, actionLabel, title, type}) => {

    return (
        <View style={{position: 'relative', bottom:80 }}  >
            <Snackbar
                style={{backgroundColor: type == 'success' ? 'green' : type === 'warning' ? 'yellow' : type === 'fail' ? 'red' : 'black'}}
                visible={isVisible}
                onDismiss={onDismiss ? onDismiss : null}
                action={action && actionLabel ? {
                    label: actionLabel,
                    onPress: action,
                } : null}>
                {title}
            </Snackbar>
        </View>
    )
}

export default CustomToast