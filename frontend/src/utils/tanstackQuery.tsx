"use client";
import { Provider as TanstackProvider } from "@/app/Provide";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const TanstackQuery = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <TanstackProvider>{children}</TanstackProvider>
      </ReduxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackQuery;
