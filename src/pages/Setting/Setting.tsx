import { IonContent, IonPage } from '@ionic/react';
import React from 'react'
import { useParams } from 'react-router';
import { Header } from '../../components/Header';
import { Container } from '../../components/Container';

type settingParams = { id: string };


export const Setting = () => {

    const { id: id } = useParams<settingParams>();

    console.log(id)


    return (
        <IonPage>
            <IonContent fullscreen>
                <Header back run />
                <Container bgColor>
                    <article className="settingContainer">
                        {id}
                    </article>
                </Container>
            </IonContent>
        </IonPage>
    )
}
