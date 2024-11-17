import { getOptions } from "../services/HortiView/api/common.api";
import { getFarmOrgEntities } from "../services/HortiView/api/module.api";
import * as Helper from "../services/HortiView/Helper";
import { HortiViewService } from "../services/HortiView/HortiViewService";
import { ApiType } from "../services/HortiView/types/types";

const mockGetConfig = jest.fn();
const mockPrependBaseUrl = jest.fn();

describe("HortiView Service", () => {
  test("Should initialise instance", async () => {
    const instance = HortiViewService.initializeInstance(
      true,
      "token",
      {
        common: "commonapi",
        module: "moduleapi",
      },
      "organizationId",
    );
    expect(instance).toBeDefined();
    expect(HortiViewService["organizationId"]).toEqual("organizationId");
    expect(HortiViewService["apis"]).toEqual({
      common: "commonapi",
      module: "moduleapi",
    });
  });

  test("Should get instance if already initialized", async () => {
    // as it is a singleton class, it should return the same instance
    const instance = HortiViewService.initializeInstance(true, "token");
    expect(instance).toBeDefined();
    const instance2 = HortiViewService.initializeInstance(true, "token");
    expect(instance2).toBeDefined();
    expect(instance).toEqual(instance2);
  });

  test("should receive insance if already initialized", async () => {
    const instance = HortiViewService.getInstance();
    expect(instance).toBeDefined();
  });
});

describe("HortiView Service Helper functions", () => {
  beforeAll(() => {
    jest.spyOn(Helper, "prependBaseUrl").mockImplementation(mockPrependBaseUrl);
    jest.spyOn(Helper, "getConfig").mockImplementation(mockGetConfig);

    HortiViewService.initializeInstance(
      true,
      "token",
      {
        common: "commonapi",
        module: "moduleapi",
      },
      "organizationId",
    );
  });

  describe("HortiView Service exposed functions", () => {
    beforeAll(() => {
      HortiViewService.initializeInstance(
        true,
        "token",
        {
          common: "commonapi",
          module: "moduleapi",
        },
        "organizationId",
      );
    });

    beforeEach(() => {
      //mock fetch
      window.fetch = async () => {
        return Promise.resolve({
          //   json: () => Promise.resolve({ test: 'test' }),
          text: () => Promise.resolve("pong"),
          ok: true,
        }) as Promise<Response>;
      };
    });

    test("should test connection", async () => {
      const instance = HortiViewService.getInstance();
      jest
        .spyOn(instance, "baseFetch")
        .mockResolvedValueOnce({ value: "pong" });
      const testConnection = await instance.testConnection();
      expect(testConnection).toBeTruthy();
    });

    test("should fail test connection", async () => {
      const instance = HortiViewService.getInstance();
      jest
        .spyOn(instance, "baseFetch")
        .mockResolvedValueOnce({ value: "ping" });
      const testConnection = await instance.testConnection();
      expect(testConnection).toBeFalsy();
    });

    test("getFarmOrgEntities should called with module and entity id", () => {
      const instance = HortiViewService.getInstance();
      const mockBaseFetch = jest.fn();
      jest.spyOn(instance, "baseFetch").mockImplementationOnce(mockBaseFetch);
      getFarmOrgEntities("1", "2");
      expect(mockBaseFetch).toHaveBeenCalledWith(
        "getAllFarmOrgEntities/1/2",
        ApiType.Module,
        {},
      );
    });

    test("getOptions should return options", () => {
      const instance = HortiViewService.getInstance();
      const mockBaseFetch = jest.fn();
      jest.spyOn(instance, "baseFetch").mockImplementationOnce(mockBaseFetch);
      getOptions("crop");
      expect(mockBaseFetch).toHaveBeenCalledWith(
        "crop/dropdown",
        ApiType.Common,
        {},
      );
    });
  });
});
