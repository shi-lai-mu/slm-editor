export enum MODULE_METADATA {
  IMPORTS       = 'imports',
  PROVIDERS     = 'providers',
  EXPORTS       = 'exports',
  INJECT        = 'inject',
  INJECT_GET    = 'inject:get',
  INJECT_MODULE = 'inject:module',
};

export enum ReflectProperty {
  ID                  = '_id',
  IMPORTS             = '_imports',
  IMPORTS_EXTRACT     = '_imports_extract',
  GLOBALAPI           = '_global_api',
  INJECT_INFO         = 'self:inject_info',
  INJECT_CONFIG       = 'self:inject_config',
  INJECT_GET_CONFIG   = 'self:inject_get_config',
  RENDER_INJECT       = 'self:render_inject',
}