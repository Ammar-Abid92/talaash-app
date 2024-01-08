import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Snackbar } from 'react-native-paper';


const CustomToast = ({isVisible, onDismiss, action, actionLabel, title, type, setIsVisible}) => {

    useEffect(() => {

        const timeoutId = setTimeout(() => {
          setIsVisible(false)
        }, 2000);
    
        // Cleanup the timeout to avoid memory leaks
        return () => clearTimeout(timeoutId);
      }, []); 

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