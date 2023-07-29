import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import React from 'react';
import MainIcon from 'shared/assets/icons/Home.svg';
import AboutIcon from 'shared/assets/icons/Info.svg';
import ProfileIcon from 'shared/assets/icons/Avatar.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from 'shared/consts/router';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const SidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'Главная',
            },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: 'О сайте',
            },
        ];
        if (userData) {
            SidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    Icon: ProfileIcon,
                    text: 'Профиль',
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    Icon: ArticlesIcon,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }
        return SidebarItemsList;
    },
);
