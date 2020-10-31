import { NextPageContext } from "next";
import React from "react";
import { Links } from "../components/links";
import { get } from "../services/rest_service";
import { getAuthInfo } from "../utils/server";

type Props = {
  message: string;
}

function Page({message}: Props) {
  return <>
    <Links/>
    <p>The following is a result of a server side api call pre-render. If you right click and view source, the response from the API call will be visible in the source. This is different than say... Inspect Element, which shows the client side rendered content.</p>
    <p>This means that search engines can scrape this page, and immediately see the content, without trusting that the search engines can render SPA's.</p>
    <h2><small style={{color: "grey"}}>From backend:</small> {message}</h2>
  </>;
}

Page.getInitialProps = async (ctx : NextPageContext) => {
  let message = "Hi anonymous";
  const auth = getAuthInfo(ctx);
  if (auth.isValid) {
    message = `Hi ${auth.decodedToken.email}`;
  }
  return { message };
};

export default Page;