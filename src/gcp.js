// @flow
// import fetch from 'isomorphic-unfetch';
import 'isomorphic-unfetch';
import qs from 'qs';

type GCPOptions = {
  accessToken: string,
};

class GCP {
  accessToken: string;

  constructor(opts: GCPOptions) {
    Object.assign(this, opts);
  }

  async _fetch(url: string, settings: fetch.IsomorphicRequest) {
    const config = settings;
    if (settings.headers) {
      config.headers = {
        ...settings.headers,
        ...{ Authorization: `OAuth ${this.accessToken}` },
      };
    } else {
      config.headers = {
        Authorization: `OAuth ${this.accessToken}`,
      };
    }
    const response = await fetch(url, settings);
    return response.json();
  }

  async submit(printerId: string, content: any, contentType: string, opts: {}) {
    const payload = {
      printerid: printerId,
      content,
      contentType,
      ...opts,
    };

    const data = await this._fetch('https://www.google.com/cloudprint/submit', {
      method: 'POST',
      body: qs.stringify(payload),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data;
  }

  async search() {
    const response = await this._fetch(
      'https://www.google.com/cloudprint/search',
      {
        method: 'GET',
      }
    );

    if (response.success) {
      return response.printers;
    }
    return [];
  }
}

export default GCP;
