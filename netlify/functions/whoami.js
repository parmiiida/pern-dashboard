/**
 * Netlify'in /api/.auth/sessions/whoami isteğine 200 döner (404 engellemek için).
 * Uygulama auth kullanmıyor; bu endpoint sadece Netlify Dev'in session kontrolünü susturur.
 */
exports.handler = async () => ({
  statusCode: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(null),
});
