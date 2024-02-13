import { useFetch, useRuntimeConfig } from "nuxt/app";
import { fetchWithHeaders } from "@/utils/apiInterceptor";

const runtimeConfig = useRuntimeConfig();

interface CompanyDetailsPayload {
  name: string;
  business_type: string;
  business_description: string;
  enabled: boolean;
  address: {
    address: string;
    state: string;
    country: string;
  };
}

interface OwnerDetailsPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface SubscriptionPayload {
  subscription_id: string;
}

interface CreateAllPayload {
  name: string;
  enabled: boolean;
  business_type: string;
  business_description: string;
  first_name: string;
  last_name: string;
  email: string;
  address: {
    address: string;
    state: string;
    country: string;
  };
  password: string;
  password_confirmation: string;
  subscription_id: string;
}

class TenantAuthService {
  private static readonly API_BASE_URL = `${runtimeConfig.public.baseUrl}api/v1/tenant`;

  // private static async fetchWithHeaders(url: string, options: any) {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     // Add other common headers here if needed
  //   };
  //   return await useFetch(url, { ...options, headers });
  // }

  static async CreateCompanyDetails(
    payload: CompanyDetailsPayload
  ): Promise<any> {
    const url = `${TenantAuthService.API_BASE_URL}/create?step=company`;
    return await fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(payload),
    })
  }

  static async CreateOwnerDetails(payload: OwnerDetailsPayload): Promise<any> {
    const url = `${TenantAuthService.API_BASE_URL}/create?step=owner`;
    return await fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async CreateSubscription(payload: SubscriptionPayload): Promise<any> {
    const url = `${TenantAuthService.API_BASE_URL}/create?step=subscription`;
    return await fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async CreateAllDetails(payload: CreateAllPayload): Promise<any> {
    const url = `${TenantAuthService.API_BASE_URL}/create?step=all`;
    return await fetchWithHeaders(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
}

export default TenantAuthService;
