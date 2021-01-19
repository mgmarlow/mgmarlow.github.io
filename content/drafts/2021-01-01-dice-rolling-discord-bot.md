---
title: 'Build a Dice-rolling Discord Bot with Ruby'
date: '2021-01-01'
---

With the recent explosion of [TTRPG](https://en.wikipedia.org/wiki/Tabletop_role-playing_game)s, I thought now would be a great time to walk through the creation of a dice-slinging, roll crunching, fate-stealing Discord bot. In this guide, you will:

1. Write a Discord bot in Ruby with [discordrb](https://github.com/discordrb/discordrb).
2. Learn how to tokenize and calculate complex arithemetic expressions.
3. Deploy the final product to Heroku.

By this end of this guide, you will deploy a dice-rolling bot (for free) that you can add to your Discord server.

## Prerequisites

First things first. In order to create a bot you'll have to register a new [Discord application](https://discord.com/developers/applications) and [add a bot](https://discordpy.readthedocs.io/en/latest/discord.html). Only then can you visit your application's bot page and reveal its API token. This token will be used by `discordrb` to connect your bot to a Discord server and allow it to listen and reply to commands.

After your bot is created, don't forget to [add it to your Discord server](https://discordpy.readthedocs.io/en/latest/discord.html#inviting-your-bot)!

If you plan on deploying to [Heroku](https://www.heroku.com/), you'll also need to create an account. Otherwise, you can safely skip this step.

Finally, this guide uses [Ruby 2.7](https://www.ruby-lang.org/en/) and [Bundler 2.1.4](https://bundler.io/). Generally any Ruby version 2+ will work fine for the purposes of this bot.

## Build a dicebot

Let's kick things off by creating a new Ruby project called `dicebot`:

```
mkdir dicebot
cd ./dicebot
bundle init
```

`bundle init` creates a `Gemfile` that we can use to add the `discordrb` dependency to. Open that `Gemfile` and add the two dependencies that are needed for this project: `discordrb` for interacting with the Discord API and `dotenv` to manage your Discord bot API token.

```rb
source "https://rubygems.org"

# ...

gem "discordrb"
gem "dotenv"
```

Now run `bundle`. With gem dependencies successfully resoled, create a new file `main.rb` with the following contents:

```rb
require "discordrb"
require "dotenv/load"

client = Discordrb::Commands::CommandBot.new(token: ENV["BOT_TOKEN"], prefix: "!")

client.command(:roll) do |evt, *args|
  evt.message.reply("Hello, world!")
end

client.run
```

If you run this new file, `bundle exec ruby main.rb`, you'll observe the following error:

```
Traceback (most recent call last):
        3: from ./main.rb:4:in `<main>'
        2: from ./main.rb:4:in `new'
        1: from C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/discordrb-3.4.0/lib/discordrb/commands/command_bot.rb:73:in `initialize'
C:/Ruby27-x64/lib/ruby/gems/2.7.0/gems/discordrb-3.4.0/lib/discordrb/bot.rb:131:in `initialize': Token string is empty or nil (RuntimeError)
```

This is expected! Although your environment configuration has been loaded via `require "dotenv/load"`, the `BOT_TOKEN` environment variable hasn't been added. Do that now by creating a new file, `.env`, with the following contents:

```
BOT_ENV=<YOUR BOT TOKEN HERE>
```

Make sure that if you're tracking this file with git you add `.env` to your `.gitignore`.

Now when you run the project you should see a `discordrb` server running. Go ahead and message `!roll` in the Discord server where the bot is operating. You should see the bot reply with "Hello, world!".
