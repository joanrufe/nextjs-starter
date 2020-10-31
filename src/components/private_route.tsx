import React, { Component, FunctionComponent } from "react";
import { NextComponentType, NextPageContext} from 'next'
import { AuthInfo, getAuthInfo } from "../utils/server";

export interface AuthProps  {
  auth?: AuthInfo;
}

export function privateRoute(WrappedComponent: NextComponentType<AuthProps>) {
  return class extends Component<AuthProps> {
    static async getInitialProps(ctx: NextPageContext) {
      const auth = getAuthInfo(ctx)
      const initialProps : AuthProps = {
        auth
      };
      if (ctx.res && auth.isExpired()) {
        ctx.res.writeHead(302, {
          Location: "/login?redirected=true",
        });
        ctx.res.end();
      } 
      if (WrappedComponent.getInitialProps) return WrappedComponent.getInitialProps(initialProps);
      return initialProps;
    }

    get auth() {
      // the server pass to the client serializes the token
      // so we have to reinitialize the authToken class
      //
      // @see https://github.com/zeit/next.js/issues/3536
      return this.props.auth;
    }

    render() {
      return <WrappedComponent auth={this.auth} {...this.props} />;
    }
  };
}