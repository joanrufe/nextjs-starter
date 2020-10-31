import React, { ReactNode } from "react"
import { AuthProps, privateRoute } from "../components/private_route";
import Cookie from "js-cookie";
import Router from "next/router";
import { Links } from "../components/links";
import { TOKEN_STORAGE_KEY } from "../services/auth_token";

type Props = AuthProps & {
  message?: string
  children?: ReactNode;
}

function Page(props: Props) {
  const logout = async () => {
    Cookie.remove(TOKEN_STORAGE_KEY);
    await Router.push("/login");
  };

  return <>
    <Links />
    <p>{props.message}</p>
    <p>isAuthenticated:
      {
        props.auth && props.auth.isValid
          ? "YES Email: " +  props.auth.decodedToken.email
          : "NO"
      }
    </p>
    <button onClick={logout}>Logout</button>
  </>
}

Page.getInitialProps = async ({ auth }: AuthProps): Promise<Props> => {
  let message = "";

  if(auth && !auth.isExpired()) {
    console.log('isAuthenticated');
  }

  return { message, auth };
};

export default privateRoute(Page);