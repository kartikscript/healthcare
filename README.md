Things to learn-
1.custom input
2.object-cover/contain
---------------------
useForm -- It sets up everything you need for a form, like handling inputs, validation, and submission,
--------------------
z.infer<typeof UserFormValidation>
z.infer takes a schema (in this case, UserFormValidation) and automatically figures out the TypeScript type based on that schema. This ensures the form fields' types match the rules defined in your schema.

Example:
If UserFormValidation says that name is a required string, z.infer<typeof UserFormValidation> ensures the name field in your form must be a string.
***checks the type of field
-----------------------
resolver: zodResolver(UserFormValidation)
The resolver tells useForm to use Zod to validate the form's fields. It uses the UserFormValidation schema to check if the inputs follow the rules you defined.

Example:
If the email in the schema is required and must match an email pattern, this resolver will automatically validate the email field for you.
if the name requires min of 2 characters and inputs less than it than validate the field and warns.
****checks if anything go beyond rules defined in schema
