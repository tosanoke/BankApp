import { z, AnyZodObject } from "zod";
import {Request, Response, NextFunction} from 'express';

const balanceSchema = z.object({
    body: z.object({
      balance: z.number({
         required_error:"input a valid amount"
      }).positive(),
    }),
  });

const transferSchema = z.object({
  body: z.object({
    from: z.string({
      required_error: "account number is required",
    }).length(10),

    to: z.string({
      required_error: "account number is required",
    }).length(10),

    amount: z.number({
      required_error:"input a valid amount"
   }).positive()

  }),
});
const userSchema = z.object({
  body: z.object({
      firstname: z.string({ 
        required_error:"input your firstname"
      }),
      lastname: z.string({ 
        required_error:"input your lastname"
      }),
      email: z.string({
        required_error: "input a valid email"
      }).email(),
      password: z.string({
        required_error:"input a valid password"
      }).min(5)
  })

})

const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "invalid credentials"
    }).email(),
    password: z.string({
      required_error:"invalid credentials"
    }).min(5)
  })
})
  
  const validate = (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};


export {
    validate,
    balanceSchema,
    transferSchema,
    userSchema,
    loginSchema
}