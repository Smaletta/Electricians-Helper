import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ConduitModalProvider } from '@/context/ConduitBendingModal';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <ConduitModalProvider>
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
                name="virp"
                options={{
                    title: 'VIRP',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="bolt.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="motor"
                options={{
                    title: 'Motor',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
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
        </ConduitModalProvider>
    );
}