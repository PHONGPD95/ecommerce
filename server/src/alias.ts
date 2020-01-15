import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '~base': `${__dirname}/modules/base`,
  '~models': `${__dirname}/modules/models`,
  '~graphql': `${__dirname}/modules/graphql`,
  '~database': `${__dirname}/database`,
  '~context': `${__dirname}/modules/context`,
  '~utils': `${__dirname}/modules/utils`,
  '~jobs': `${__dirname}/jobs`,
  '~': `${__dirname}`,
});
