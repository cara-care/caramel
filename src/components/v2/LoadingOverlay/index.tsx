import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import theme from '../../../utils/Theme';

interface Props {
  message?: string;
  description?: string;
  bgOpacity?: number;
  success?: boolean;
  successMessage?: string;
  successDescription?: string;
}

const LoadingOverlay: FC<Props> = ({
  message,
  description,
  bgOpacity,
  success,
  successMessage,
  successDescription,
}) => {
  return (
    <>
      <View style={[styles.background, styles.overlay, {opacity: bgOpacity}]} />
      <View style={[styles.content, styles.overlay]}>
        {success ? (
          <Image
            style={styles.loader}
            source={require('../../assets/images/loaders/loader-success.gif')}
          />
        ) : (
          <Image
            style={styles.loader}
            source={require('../../assets/images/loaders/loader-success.gif')}
          />
        )}
        {(message || successMessage) && (
          <Text style={styles.message}>
            {success ? successMessage : message}
          </Text>
        )}
        {(description || successDescription) && (
          <Text style={styles.description}>
            {success ? successDescription : description}
          </Text>
        )}
      </View>
    </>
  );
};

LoadingOverlay.defaultProps = {bgOpacity: 0.95};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    backgroundColor: theme.colors.white,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
  },
  loader: {
    width: 80,
    height: 80,
  },
  message: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    fontSize: 14,
    color: theme.colors.black,
  },
  description: {
    marginTop: theme.spacing.sm,
    maxWidth: 200,
    textAlign: 'center',
    fontSize: 13,
    color: theme.colors.grey,
  },
});

export default LoadingOverlay;
