import fetch from "node-fetch";
import { AddUserInput } from "../resolvers/UserResolver";

export class TestClient {
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	async addUser({ email, name }: AddUserInput) {
		return fetch(this.url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				query: `
          mutation addUser {
            addUser(data: { email: "${email}", name: "${name}" }) {
              id
              email
              name
            }
          }
        `,
			}),
		}).then((res) => res.json());
	}
}
