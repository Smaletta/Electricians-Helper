import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ConduitModalProvider } from '@/context/ConduitBendingModal';
import { WireModalProvider } from '@/context/WireCalcModal';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <ConduitModalProvider>
            <WireModalProvider>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                        headerShown: false,
                        tabBarButton: HapticTab,
                        tabBarBackground: TabBarBackground,
                        tabBarStyle: Platform.select({
                            ios: {
                                // Use a transparent background on iOS to show the blur effect
                                position: 'absolute',
                            },
                            default: {},
                        }),
                    }}>
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: 'Quick Ref',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="conduit"
                        options={{
                            title: 'Conduit',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.swap" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="varp"
                        options={{
                            title: 'VARP',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="bolt.fill" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="wires"
                        options={{
                            title: 'Wires',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrow.2.circlepath" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="transformer"
                        options={{
                            title: 'Transformer',
                            tabBarIcon: ({ color }) => <IconSymbol size={28} name="arrowtriangle.up" color={color} />,
                        }}
                    />
                </Tabs>
            </WireModalProvider>
        </ConduitModalProvider>
    );
}