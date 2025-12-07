import * as core from "@actions/core";
import fs from "fs";

try {
  const token = core.getInput("token", { required: true });
  const instance = core.getInput("instance") || "https://mastodon.social";
  const status = core.getInput("status", { required: true });
  const visibility = core.getInput("visibility") || "public";
  const ret = await postStatus(token, instance, status, visibility);
  core.debug(`Response: ${JSON.stringify(ret)}`);
  for (const field of [
    "id",
    "url",
    "uri",
    "created_at",
    "content",
    "visibility",
  ]) {
    core.setOutput(field, ret[field]);
  }
} catch (error) {
  core.setFailed(error.message);
}

// https://docs.joinmastodon.org/methods/statuses/#create
async function postStatus(token, instance, status, visibility) {
  const api = `${instance}/api/v1/statuses`;
  const payload = {
    status,
    visibility,
  };
  core.debug(`Posting to ${api} with payload: ${JSON.stringify(payload)}`);
  const resp = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(
      `Send message failed: ${await resp.text()}, code: ${resp.status}`,
    );
  }

  return await resp.json();
}
