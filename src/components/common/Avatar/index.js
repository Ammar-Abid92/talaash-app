import React from 'react';
import {
    Image,
    ImageProps,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export const Avatar = ({ source, onChange, avatarWidth, avatarHeight }) => {
    const [uri, setUri] = React.useState(source?.uri || undefined);
    const [visible, setVisible] = React.useState(false);
    const close = () => setVisible(false);
    const open = () => setVisible(true);


    const chooseImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                setUri(image.path);
                onChange?.(image);
            })
            .finally(close);
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                setUri(image.path);
                onChange?.(image);
            })
            .finally(close);
    };

    return (
        <>
            <TouchableOpacity onPress={open}>
                <Image
                    style={{ ...styles.avatar, height: avatarHeight, width: avatarWidth }}
                    source={uri ? { uri } : source}
                />
            </TouchableOpacity>
            <Modal
                isVisible={visible}
                onBackButtonPress={close}
                onBackdropPress={close}
                style={{ justifyContent: 'flex-end', margin: 0 }}>
                <SafeAreaView style={styles.options}>
                    <Pressable style={styles.option} onPress={chooseImage}>
                        <Icon name="file-image-o" size={30} color={"#000000"} />
                        <Text>Library </Text>
                    </Pressable>
                    <Pressable style={styles.option} onPress={openCamera}>
                        <Icon name="camera" size={30} color={"#000000"} />
                        <Text>Camera</Text>
                    </Pressable>
                </SafeAreaView>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    avatar: {
        paddingTop: 20,
        borderRadius: 10,
        padding: 5,
    },

    options: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        flex: 0.20
    },
    option: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});