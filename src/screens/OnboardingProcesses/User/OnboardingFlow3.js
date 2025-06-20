import {Animated, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PreferencesCard from '../../../components/cards/PreferencesCard';
import {rendezvousInterests} from '../../../data/dummyData';
import SafeAreaViewComponent from '../../../components/common/SafeAreaViewComponent';
import FixedBottomContainer from '../../../components/common/FixedBottomContainer';
import FormButton from '../../../components/form/FormButton';
import ScrollViewSpace from '../../../components/common/ScrollViewSpace';
import HeaderTitle from '../../../components/common/HeaderTitle';
import {useTheme} from '../../../Context/ThemeContext';

const OnboardingFlow3 = ({navigation, route}) => {
  const item = route.params;
  console.log('item', item);

  const {theme} = useTheme();

  const [selectedCategories, setSelectedCategories] = useState([]);
  console.log('selectedCategories', selectedCategories);

  const handleToggleSelect = category => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category)
        ? prevSelected.filter(item => item !== category)
        : [...prevSelected, category],
    );
  };

  const onboardNext2 = () => {
    const onboarding1Data = {
      fullName: item?.fullName,
      gender: item?.gender,
      personality: item?.personality,
      country: item?.country,
      relationshipStatus: item?.relationshipStatus,
      bio: item?.bio,
      city: item?.city,
      height: item?.height,
      dob: item?.dob,
      interests: selectedCategories,
    };
    navigation.navigate('OnboardingFlow4', onboarding1Data);
  };

  return (
    <SafeAreaViewComponent>
      <HeaderTitle
        leftIcon={'arrow-back-outline'}
        progress={60}
        onLeftIconPress={() => {
          navigation.goBack();
        }}
      />
      <Text style={[styles.title, {color: theme.text}]}>
        Choose Your Interests
      </Text>
      <Text style={[styles.subtitle, {color: theme.rendezvousText}]}>
        Select the interests that best describe your preferences.
      </Text>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {backgroundColor: theme?.background},
        ]}>
        <View style={[styles.cardsContainer]}>
          {rendezvousInterests?.map((cur, i) => (
            <PreferencesCard
              key={i}
              category={cur}
              selectedCategories={selectedCategories}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </View>
        <ScrollViewSpace />
      </ScrollView>

      {/* Buttons */}
      <FixedBottomContainer top={1.17}>
        <FormButton
          title={'Next'}
          width={1.1}
          onPress={onboardNext2}
          //   formError={formError}
          disabled={!selectedCategories?.length}
        />
      </FixedBottomContainer>
    </SafeAreaViewComponent>
  );
};

export default OnboardingFlow3;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  animatedCard: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50, // Makes it a perfect circle
    overflow: 'hidden',
  },
});
