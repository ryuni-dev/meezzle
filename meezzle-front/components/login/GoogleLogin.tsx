import styled from "styled-components";

const GoogleLogin: React.FC = () => {
    return (
        <Container>
            <div
                id="g_id_onload"
                data-client_id="YOUR_GOOGLE_CLIENT_ID"
                data-login_uri="https://your.domain/your_login_endpoint"
                data-auto_prompt="false"
            ></div>
            <div
                className="g_id_signin"
                data-type="standard"
                data-size="large"
                data-theme="outline"
                data-text="sign_in_with"
                data-shape="rectangular"
                data-logo_alignment="left"
            ></div>
        </Container>
    );
};

export default GoogleLogin;

const Container = styled.div`
    width: 331px;
    height: 50px;
    margin: 0 auto;
    margin-top: 13px;

    .g_id_signin > div > div > div {
        width: 331px;
        height: 50px;
    }
`;
