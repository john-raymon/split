# MEVN boilerplate. 

Privacy service
- The privacy service will attempt to fetch end-users via an 'account_token' query param, the Privacy service will only return the end-user's data if in sandbox mode or if in production with an enterprise card issue plan. If neither is true then the platform main-account's related data is returned, if on sandbox, or in production running an 'enterprise' plan, then the Privacy service will return the requested data for the specified instance account (end-user), if one or more end-users have been enrolled and no account_token argument, or the wrong one is supplied, an API error will be returned.
