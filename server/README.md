# README

### For files thumbnail

- imagemagick

### Bundle install

```
bundle install
```

## DB

```bash
bundle exec rails db:create
```

## DB Migration

```bash
bundle exec rake ridge:apply ALLOW_DROP_TABLE=1 ALLOW_REMOVE_COLUMN=1
```

## DB Seed ( for development only )

```bash
bundle exec rails db:seed
```

# Run server on port 3000

```bash
bundle exec foreman start
```

After all of above commands are executed, you are now able to access: `http://localhost.com:3000/`

## Annotation ( For development only )

```bash
bundle exec rake remove_annotation && bundle exec rake annotate_models
```

## Note on PR

Please run following commands before submit PR

### RSpec:

```
bundle exec rspec
```

### Rubocop:

```
bundle exec rubocop -A
```
