import { useCallback, useEffect, useState } from 'react';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { firebase } from '~/lib/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { addLoggedInUser } from '../lib/FirebaseAnalysis';

export default function OneTap() {
    const [shouldRender, setRender] = useState<boolean>(false);

    const handleCredentialResponse = useCallback(
        async (response: any) => {
            if (!response) return;

            const cred = GoogleAuthProvider.credential(response.credential);
            setRender(false);
            // Sign in with credential from the Google user.
            const res = await signInWithCredential(firebase.firebaseAuth, cred);
            addLoggedInUser(res.user);
            return res;
        },
        [setRender]
    );

    useEffect(() => {
        const unsubscribe = firebase.firebaseAuth.onAuthStateChanged((userCredentials) => {
            setRender(userCredentials == null);
            unsubscribe();
        });
    }, []);

    return <>{shouldRender && <PopUp handleCredentialResponse={handleCredentialResponse} />}</>;
}

const PopUp = ({
    handleCredentialResponse
}: {
    handleCredentialResponse: (res: any) => Promise<any | undefined>;
}) => {
    useGoogleOneTapLogin({
        googleAccountConfigs: {
            client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string,
            auto_select: false,
            cancel_on_tap_outside: false,
            callback: handleCredentialResponse
        }
    });

    return <></>;
};
