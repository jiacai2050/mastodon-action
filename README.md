# Mastodon Action

A GitHub Action to post new Mastodon status.

## Inputs
- `token`: The access token for the Mastodon account.
- `instance`: The URL of the Mastodon instance. Default is `https://mastodon.social`.
- `status`: The content of the status to be posted.
- `visibility`: The visibility of the status (`public`, `unlisted`, `private`, or `direct`). Default is `public`.

## Outputs
- `id`: The ID of the posted status.
- `url`: The URL of the posted status.
- `uri`: The URI of the posted status. See [Mastodon API documentation](https://docs.joinmastodon.org/entities/Status/#example) for difference between URL and URI.
- `created_at`: The timestamp when the status was created.
- `visibility`: The visibility of the posted status.
- `content`: The content of the posted status.

## Example usage

### Basic Example
```yaml
- name: Post Mastodon Status
  uses: jiacai2050/mastodon-action@v1
  with:
    token: ${{ secrets.MASTODON_TOKEN }}
    status: |
      Hello, Mastodon from GitHub Actions!
```

### Print Outputs
```yaml
name: Post Mastodon Status

on:
  workflow_dispatch:
jobs:
  Send:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v6
      - name: Post Mastodon Status
        uses: jiacai2050/mastodon-action@main
        id: mastodon
        with:
          token: ${{ secrets.MASTODON_TOKEN }}
          status: |
            <h1>Hello Mastodon</h1>
            This is a post from GitHub Actions

      - name: Output Result
        run: |
          echo "ID: ${{ steps.mastodon.outputs.id }}"
          echo "URL: ${{ steps.mastodon.outputs.url }}"
          echo "URL: ${{ steps.mastodon.outputs.uri }}"
          echo "Date: ${{ steps.mastodon.outputs.created_at }} "
          echo "Content: ${{ steps.mastodon.outputs.content }}"
          echo "Visibility: ${{ steps.mastodon.outputs.visibility }}"
```
