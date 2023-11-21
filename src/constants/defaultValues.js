export const completeVideoPlayPercentage = 0.9;
export const minimumVideoPlayPercentage = 0.75;
export const updateFrequency = 0.5;
export const defaultLocale = "th";
export const localeOptions = [
  { id: "th", name: "ไทย" },
  { id: "en", name: "English" },
];

const dev = {
  Storage: {
    AWSS3: {
      bucket: "bebe-platform",
      region: "ap-southeast-1",
    },
  },
  Auth: {
    region: "ap-southeast-1",
    userPoolId: "ap-southeast-1_yVVf1J0zR",
    identityPoolId: "ap-southeast-1:cc1900b3-00e0-4aef-8f1b-c1c6eaa1b7a8",
    userPoolWebClientId: "2i1b1e5sag1hvc2sr008v6hpf",
  },
  API: {
    endpoints: [
      {
        name: "bebe_platform",
        endpoint: "http://localhost:3003",
        region: "ap-southeast-1",
      },
      {
        name: "bebe_stay_fit",
        endpoint: "http://localhost:3004",
        region: "ap-southeast-1",
      },
      {
        name: "pynk",
        endpoint: "http://localhost:3005",
        region: "ap-southeast-1",
      },
    ],
  },
};

const prod = {
  Storage: {
    AWSS3: {
      bucket: "bebe-platform",
      region: "ap-southeast-1",
    },
  },
  Auth: {
    region: "ap-southeast-1",
    userPoolId: "ap-southeast-1_yVVf1J0zR",
    identityPoolId: "ap-southeast-1:cc1900b3-00e0-4aef-8f1b-c1c6eaa1b7a8",
    userPoolWebClientId: "2i1b1e5sag1hvc2sr008v6hpf",
  },
  API: {
    endpoints: [
      {
        name: "bebe_platform",
        endpoint: "https://api.planforfit.com/bebe",
        region: "ap-southeast-1",
      },
      {
        name: "bebe_stay_fit",
        endpoint: "https://api.planforfit.com/bebefit",
        region: "ap-southeast-1",
      },
      {
        name: "pynk",
        endpoint: "https://api.planforfit.com/pynk",
        region: "ap-southeast-1",
      },
    ],
  },
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : prod; // แก้เป็น prod เพื่อทดสอบจาก data challenge จริงๆ

export const awsConfig = {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};
