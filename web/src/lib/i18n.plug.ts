import { I18nOptions } from "@better-auth/i18n";

type Options = I18nOptions<["pt"]>["translations"];

export const i18nTranslations = {
  pt: {
    // --- Core (BASE_ERROR_CODES) ---
    USER_NOT_FOUND: "Utilizador não encontrado",
    FAILED_TO_CREATE_USER: "Falha ao criar o utilizador",
    FAILED_TO_CREATE_SESSION: "Falha ao criar a sessão",
    FAILED_TO_UPDATE_USER: "Falha ao atualizar o utilizador",
    FAILED_TO_GET_SESSION: "Falha ao obter a sessão",
    INVALID_PASSWORD: "Palavra-passe inválida",
    INVALID_EMAIL: "E-mail inválido",
    INVALID_EMAIL_OR_PASSWORD: "E-mail ou palavra-passe inválidos",
    INVALID_USER: "Utilizador inválido",
    SOCIAL_ACCOUNT_ALREADY_LINKED: "Conta social já associada",
    PROVIDER_NOT_FOUND: "Fornecedor não encontrado",
    INVALID_TOKEN: "Token inválido",
    TOKEN_EXPIRED: "Token expirado",
    ID_TOKEN_NOT_SUPPORTED: "id_token não suportado",
    FAILED_TO_GET_USER_INFO: "Falha ao obter informação do utilizador",
    USER_EMAIL_NOT_FOUND: "E-mail do utilizador não encontrado",
    EMAIL_NOT_VERIFIED: "E-mail não verificado",
    PASSWORD_TOO_SHORT: "Palavra-passe demasiado curta",
    PASSWORD_TOO_LONG: "Palavra-passe demasiado longa",
    USER_ALREADY_EXISTS: "O utilizador já existe.",
    USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
      "O utilizador já existe. Utilize outro e-mail.",
    EMAIL_CAN_NOT_BE_UPDATED: "O e-mail não pode ser atualizado",
    CHANGE_EMAIL_DISABLED: "A alteração de e-mail está desativada",
    CREDENTIAL_ACCOUNT_NOT_FOUND: "Conta de credenciais não encontrada",
    SESSION_EXPIRED:
      "Sessão expirada. Volte a autenticar-se para realizar esta ação.",
    FAILED_TO_UNLINK_LAST_ACCOUNT:
      "Não pode desassociar a sua última conta",
    ACCOUNT_NOT_FOUND: "Conta não encontrada",
    USER_ALREADY_HAS_PASSWORD:
      "O utilizador já tem uma palavra-passe. Indique-a para eliminar a conta.",
    CROSS_SITE_NAVIGATION_LOGIN_BLOCKED:
      "Início de sessão por navegação entre sites bloqueado. Este pedido parece ser um ataque CSRF.",
    VERIFICATION_EMAIL_NOT_ENABLED:
      "O e-mail de verificação não está ativado",
    EMAIL_ALREADY_VERIFIED: "O e-mail já está verificado",
    EMAIL_MISMATCH: "Os e-mails não coincidem",
    SESSION_NOT_FRESH: "A sessão não está atualizada",
    LINKED_ACCOUNT_ALREADY_EXISTS: "A conta associada já existe",
    INVALID_ORIGIN: "Origem inválida",
    INVALID_CALLBACK_URL: "callbackURL inválido",
    INVALID_REDIRECT_URL: "redirectURL inválido",
    INVALID_ERROR_CALLBACK_URL: "errorCallbackURL inválido",
    INVALID_NEW_USER_CALLBACK_URL: "newUserCallbackURL inválido",
    MISSING_OR_NULL_ORIGIN: "Origin em falta ou nulo",
    CALLBACK_URL_REQUIRED: "callbackURL é obrigatório",
    FAILED_TO_CREATE_VERIFICATION: "Não foi possível criar a verificação",
    FIELD_NOT_ALLOWED: "Campo não permitido",
    ASYNC_VALIDATION_NOT_SUPPORTED:
      "Validação assíncrona não suportada",
    VALIDATION_ERROR: "Erro de validação",
    MISSING_FIELD: "Campo obrigatório",
    METHOD_NOT_ALLOWED_DEFER_SESSION_REQUIRED:
      "O método POST requer deferSessionRefresh ativado na configuração da sessão",
    BODY_MUST_BE_AN_OBJECT: "O corpo do pedido tem de ser um objeto",
    PASSWORD_ALREADY_SET: "O utilizador já tem uma palavra-passe definida",

    // --- Admin (ADMIN_ERROR_CODES) ---
    YOU_CANNOT_BAN_YOURSELF: "Não se pode banir a si próprio",
    YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE:
      "Não tem permissão para alterar a função dos utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS:
      "Não tem permissão para criar utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_LIST_USERS:
      "Não tem permissão para listar utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS:
      "Não tem permissão para listar sessões de utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_BAN_USERS:
      "Não tem permissão para banir utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS:
      "Não tem permissão para personificar utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS:
      "Não tem permissão para revogar sessões de utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS:
      "Não tem permissão para eliminar utilizadores",
    YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD:
      "Não tem permissão para definir a palavra-passe dos utilizadores",
    BANNED_USER: "Foi banido desta aplicação",
    YOU_ARE_NOT_ALLOWED_TO_GET_USER:
      "Não tem permissão para obter o utilizador",
    NO_DATA_TO_UPDATE: "Sem dados para atualizar",
    YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS:
      "Não tem permissão para atualizar utilizadores",
    YOU_CANNOT_REMOVE_YOURSELF: "Não se pode remover a si próprio",
    YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE:
      "Não tem permissão para definir um valor de função inexistente",
    YOU_CANNOT_IMPERSONATE_ADMINS:
      "Não pode personificar administradores",
    INVALID_ROLE_TYPE: "Tipo de função inválido",

    // --- Organization (ORGANIZATION_ERROR_CODES) ---
    YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_ORGANIZATION:
      "Não tem permissão para criar uma nova organização",
    YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_ORGANIZATIONS:
      "Atingiu o número máximo de organizações",
    ORGANIZATION_ALREADY_EXISTS: "A organização já existe",
    ORGANIZATION_SLUG_ALREADY_TAKEN:
      "O identificador (slug) da organização já está em uso",
    ORGANIZATION_NOT_FOUND: "Organização não encontrada",
    USER_IS_NOT_A_MEMBER_OF_THE_ORGANIZATION:
      "O utilizador não é membro da organização",
    YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_ORGANIZATION:
      "Não tem permissão para atualizar esta organização",
    YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_ORGANIZATION:
      "Não tem permissão para eliminar esta organização",
    NO_ACTIVE_ORGANIZATION: "Nenhuma organização ativa",
    USER_IS_ALREADY_A_MEMBER_OF_THIS_ORGANIZATION:
      "O utilizador já é membro desta organização",
    MEMBER_NOT_FOUND: "Membro não encontrado",
    ROLE_NOT_FOUND: "Função não encontrada",
    YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM:
      "Não tem permissão para criar uma nova equipa",
    TEAM_ALREADY_EXISTS: "A equipa já existe",
    TEAM_NOT_FOUND: "Equipa não encontrada",
    YOU_CANNOT_LEAVE_THE_ORGANIZATION_AS_THE_ONLY_OWNER:
      "Não pode sair da organização sendo o único proprietário",
    YOU_CANNOT_LEAVE_THE_ORGANIZATION_WITHOUT_AN_OWNER:
      "Não pode sair da organização sem deixar um proprietário",
    YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_MEMBER:
      "Não tem permissão para eliminar este membro",
    YOU_ARE_NOT_ALLOWED_TO_INVITE_USERS_TO_THIS_ORGANIZATION:
      "Não tem permissão para convidar utilizadores para esta organização",
    USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION:
      "O utilizador já foi convidado para esta organização",
    INVITATION_NOT_FOUND: "Convite não encontrado",
    YOU_ARE_NOT_THE_RECIPIENT_OF_THE_INVITATION:
      "Não é o destinatário deste convite",
    EMAIL_VERIFICATION_REQUIRED_BEFORE_ACCEPTING_OR_REJECTING_INVITATION:
      "É necessária a verificação do e-mail antes de aceitar ou rejeitar o convite",
    EMAIL_VERIFICATION_REQUIRED_FOR_INVITATION:
      "É necessária a verificação do e-mail para ver ou listar convites do e-mail da sessão",
    YOU_ARE_NOT_ALLOWED_TO_CANCEL_THIS_INVITATION:
      "Não tem permissão para cancelar este convite",
    INVITER_IS_NO_LONGER_A_MEMBER_OF_THE_ORGANIZATION:
      "Quem convidou já não é membro da organização",
    YOU_ARE_NOT_ALLOWED_TO_INVITE_USER_WITH_THIS_ROLE:
      "Não tem permissão para convidar um utilizador com esta função",
    FAILED_TO_RETRIEVE_INVITATION: "Falha ao obter o convite",
    YOU_HAVE_REACHED_THE_MAXIMUM_NUMBER_OF_TEAMS:
      "Atingiu o número máximo de equipas",
    UNABLE_TO_REMOVE_LAST_TEAM: "Não é possível remover a última equipa",
    YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_MEMBER:
      "Não tem permissão para atualizar este membro",
    ORGANIZATION_MEMBERSHIP_LIMIT_REACHED:
      "Limite de membros da organização atingido",
    YOU_ARE_NOT_ALLOWED_TO_CREATE_TEAMS_IN_THIS_ORGANIZATION:
      "Não tem permissão para criar equipas nesta organização",
    YOU_ARE_NOT_ALLOWED_TO_DELETE_TEAMS_IN_THIS_ORGANIZATION:
      "Não tem permissão para eliminar equipas nesta organização",
    YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_TEAM:
      "Não tem permissão para atualizar esta equipa",
    YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_TEAM:
      "Não tem permissão para eliminar esta equipa",
    INVITATION_LIMIT_REACHED: "Limite de convites atingido",
    TEAM_MEMBER_LIMIT_REACHED: "Limite de membros da equipa atingido",
    USER_IS_NOT_A_MEMBER_OF_THE_TEAM:
      "O utilizador não é membro da equipa",
    YOU_CAN_NOT_ACCESS_THE_MEMBERS_OF_THIS_TEAM:
      "Não tem permissão para listar os membros desta equipa",
    YOU_DO_NOT_HAVE_AN_ACTIVE_TEAM: "Não tem uma equipa ativa",
    YOU_ARE_NOT_ALLOWED_TO_CREATE_A_NEW_TEAM_MEMBER:
      "Não tem permissão para criar um novo membro",
    YOU_ARE_NOT_ALLOWED_TO_REMOVE_A_TEAM_MEMBER:
      "Não tem permissão para remover um membro da equipa",
    YOU_ARE_NOT_ALLOWED_TO_ACCESS_THIS_ORGANIZATION:
      "Não tem permissão para aceder a esta organização como proprietário",
    YOU_ARE_NOT_A_MEMBER_OF_THIS_ORGANIZATION:
      "Não é membro desta organização",
    MISSING_AC_INSTANCE:
      "O controlo de acesso dinâmico requer uma instância ac pré-definida no plugin de autenticação do servidor. Consulte os registos do servidor para mais informação",
    YOU_MUST_BE_IN_AN_ORGANIZATION_TO_CREATE_A_ROLE:
      "Tem de estar numa organização para criar uma função",
    YOU_ARE_NOT_ALLOWED_TO_CREATE_A_ROLE:
      "Não tem permissão para criar uma função",
    YOU_ARE_NOT_ALLOWED_TO_UPDATE_A_ROLE:
      "Não tem permissão para atualizar uma função",
    YOU_ARE_NOT_ALLOWED_TO_DELETE_A_ROLE:
      "Não tem permissão para eliminar uma função",
    YOU_ARE_NOT_ALLOWED_TO_READ_A_ROLE:
      "Não tem permissão para ler uma função",
    YOU_ARE_NOT_ALLOWED_TO_LIST_A_ROLE:
      "Não tem permissão para listar funções",
    YOU_ARE_NOT_ALLOWED_TO_GET_A_ROLE:
      "Não tem permissão para obter uma função",
    TOO_MANY_ROLES: "Esta organização tem demasiadas funções",
    INVALID_RESOURCE:
      "A permissão fornecida inclui um recurso inválido",
    ROLE_NAME_IS_ALREADY_TAKEN: "Esse nome de função já está em uso",
    CANNOT_DELETE_A_PRE_DEFINED_ROLE:
      "Não é possível eliminar uma função pré-definida",
    ROLE_IS_ASSIGNED_TO_MEMBERS:
      "Não é possível eliminar uma função atribuída a membros. Reatribua os membros a outra função primeiro",
    INVALID_TEAM_ID:
      "O identificador da equipa contém um carácter reservado",
  },
} satisfies Options;
