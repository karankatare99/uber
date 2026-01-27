import axios from "axios";
import { NextRequest } from "next/server";

async function getUser(request: NextRequest) {
  const res = await fetch(`/api/auth/session`);
  const { user } = await res.json();

  return user
}